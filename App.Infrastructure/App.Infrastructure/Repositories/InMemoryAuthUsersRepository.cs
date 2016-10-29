using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Infrastructure
{
    using Core;

    internal class AuthUser
    {
        public string Name;
        public AccountType AccountType;
    }

    public class InMemoryAuthUsersRepository : IAuthRepository
    {
        static List<AuthUser> authUsers = new List<AuthUser>();
        static object lockObj = new object();

        public bool SignIn(string Name, AccountType AccountType)
        {
            if (Name.Trim().Length == 0)
            {
                throw new ArgumentNullException(nameof(Name));
            }

            if (!Enum.IsDefined(typeof(AccountType), AccountType)) {
                throw new ArgumentNullException(nameof(AccountType));
            }

            AuthUser search = authUsers.Where(u => u.Name.Equals(Name, StringComparison.InvariantCultureIgnoreCase) && u.AccountType == AccountType)
                            .FirstOrDefault();


            if (search == null)
            {
                lock (lockObj)
                {
                    authUsers.Add(new AuthUser { Name = Name, AccountType = AccountType });
                }
            }
            return true;
        }
    }
}
