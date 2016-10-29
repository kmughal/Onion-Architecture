using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Infrastructure
{
    using Core;  

   public class DIModules : IDIModules
    {
        dynamic kernel;
        public DIModules(dynamic Kernel)
        {
            this.kernel = Kernel;
        }
        public dynamic Register() {
            this.kernel.Bind<IArticleRepository>().To<InMemoryArticleRepository>();
            this.kernel.Bind<IAuthRepository>().To<InMemoryAuthUsersRepository>();
            this.kernel.Bind<IUserArticleRatingRepository>().To<InMemoryUserArticleRatingRepoistory>();
            return this.kernel;
        }
    }


    
}
