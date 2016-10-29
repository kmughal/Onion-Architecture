using System.Web.Http;
using System;
using System.Collections.Generic;
using System.Web.Http.Cors;
using System.Linq;


namespace App.Service.Controllers.Article
{
    using Core;


    [EnableCors("*", "*", "*")]
    public class ArticleController : ApiController
    {
        IArticleRepository articleRepo;

        public ArticleController(IArticleRepository ArticleRepository)
        {
            this.articleRepo = ArticleRepository;
        }

        [HttpPost]        
        [Route("api/Article")]        
        public IHttpActionResult SaveArticle([FromBody] ArticleDto NewArticle)
        {            
            this.articleRepo.AddArticle(Article.CreateNewArticle(NewArticle.Title, NewArticle.Body, DateTime.Parse(NewArticle.PublishDate), NewArticle.Publisher));
            return Ok(ArticleServiceMessages.ARTICLE_ADDED_SUCCESSFULLY);
        }

        [HttpPost]
        [Route("api/Article/Edit")]
        public IHttpActionResult UpdateArticle([FromBody] ArticleDto EditArticle)
        {
            DateTime pbDate = DateTime.Parse(EditArticle.PublishDate);
            this.articleRepo.UpdateArticle(EditArticle.Id, EditArticle.Title, EditArticle.Body, pbDate, EditArticle.Publisher);
            return Ok(ArticleServiceMessages.ARTICLE_UPDAED_SUCCESSFULLY);
        }

        [HttpPost]
        [Route("api/Article/Publisher/{Publisher}")]
        public IHttpActionResult GetArticlesByPublisher(string Publisher) {
           var articles = this.articleRepo.GetArticleByPublisher(Publisher);
            return Ok(articles);
        }

        [HttpPost]
        [Route("api/Article/Publisher/Remove/{Id}")]
        public IHttpActionResult RemoveArticle(string Id) {            
            bool result = this.articleRepo.RemoveArticle(Id);
            return Ok(ArticleServiceMessages.ARTICLE_REMOVED_SUCCESSFULLY);
        }

        [HttpPost]
        [Route("api/Articles")]
        public IHttpActionResult GetAllArticles() {
            List<Article> articles = this.articleRepo.GetAll().ToList();
            return Ok(articles);
        }
    }
}
