using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace App.Web.Controllers.UserArticle
{
    using Core;
    
    [EnableCors("*", "*", "*")]
    public class UserArticleRatingController : ApiController
    {
        private IUserArticleRatingRepository userArticleRatingRepository;
        public UserArticleRatingController(IUserArticleRatingRepository UserArticleRatingRepository)
        {
            this.userArticleRatingRepository = UserArticleRatingRepository;
        }

        [HttpPost]
        [Route("api/User/Articles/{UserName}")]
        public IHttpActionResult GetAllArticles(string UserName) {
            List<UserArticleRatingDto> result = this.userArticleRatingRepository.GetUserArticlesWithRating(UserName).ToList();
            return Ok(result);
        }

        [HttpPost]
        [Route("api/User/Article/Rating/{ArticleId}/{UserName}/{Rating}")]
        public IHttpActionResult SaveUserArticleRating(string ArticleId, string UserName, string Rating) {
            this.userArticleRatingRepository.SaveRating(ArticleId, UserName, int.Parse(Rating));
            return Ok("User rating saved!");
        }

    }
}
