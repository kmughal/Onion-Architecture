using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Infrastructure
{
    using Core;
    
    public class ArticleBuilder : IExpectTitle, IExpectBody, IExpectPublishDate, IExpectPublisher, IBuildArticle
    {
        private string title, body, publisher;
        private DateTime publishDate;

        private  ArticleBuilder()
        {
          

        }

        public static IExpectTitle Setup() => new ArticleBuilder();

        public Article Build() => Article.CreateNewArticle(title, body, publishDate, publisher);

        public IExpectPublishDate SetBody(string Body)
        {
            this.body = Body;
            return this;
        }

        public IExpectPublisher SetPublishDate(DateTime PublishDate)
        {
            this.publishDate = PublishDate;
            return this;
        }

        public IBuildArticle SetPusblisher(string Publisher)
        {
            this.publisher = Publisher;
            return this;
        }

        public IExpectBody SetTitle(string Title)
        {
            this.title = Title;
            return this;
        }
    }
}
