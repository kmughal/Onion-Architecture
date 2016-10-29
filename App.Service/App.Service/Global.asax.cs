using Ninject.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace App.Service
{

    using Core;
    using Infrastructure;
    using Ninject;
    using Ninject.Web.Common;

    
    public class WebApiApplication : NinjectHttpApplication
    {

        protected override IKernel CreateKernel()
        {
            IKernel kernel = new StandardKernel();
            IDIModules di = new DIModules(kernel);            
            return di.Register();
        }

        private void RegisterKernel(IKernel kernel) {
            kernel.Bind<IArticleRepository>().To<InMemoryArticleRepository>();
            kernel.Bind<IAuthRepository>().To<InMemoryAuthUsersRepository>();
            kernel.Bind<IUserArticleRatingRepository>().To<InMemoryUserArticleRatingRepoistory>();
        }

        protected override void OnApplicationStarted()
        {
            base.OnApplicationStarted();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        }
    }
}
