using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{
    public interface IAuthRepository
    {
        bool SignIn(string Name, AccountType AccountType);
    }

    public enum AccountType  {
        Publisher , User
    }
}
