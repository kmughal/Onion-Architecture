using System;
using System.Web.Http;

namespace App.Web.Controllers.Auth
{
    using Core;    
    using System.Web.Http.Cors;

    [EnableCors("*", "*", "*")]
    public class AuthController : ApiController
    {
        IAuthRepository authResp;
        public AuthController(IAuthRepository authRepository)
        {
            this.authResp = authRepository;            
        }

        public IHttpActionResult Get()
        {
            return Ok("Test");
        }

        [Route("api/Auth/{Name}/{AccountType}")]
        [HttpPost]
        public IHttpActionResult SignIn(string Name, string AccountType)
        {
            AccountType accType = AccountType.Equals("user", StringComparison.InvariantCultureIgnoreCase) ? App.Core.AccountType.User : Core.AccountType.Publisher;
            bool wasAuthorized = this.authResp.SignIn(Name, accType);
            return Ok(new { Name = Name, AccountType = AccountType });
        }
    }
}

