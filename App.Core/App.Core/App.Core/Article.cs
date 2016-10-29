using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{   
      
    [DataContract]
    public class Article : IArticleFactory
    {
        [DataMember]
        public string Id { get; private set; }
        [DataMember]
        public string Body { get; private set; }
        [DataMember]
        public string Title { get; private set; }
        [DataMember]
        public DateTime PublishDate { get; set; }
        [DataMember]
        public string Publisher { get; set; }

        
        IKeyGenerator keyGen;

        private Article(string title,
            string body,
            DateTime publishDate,
            string publisher)
        {

            this.keyGen = new KeyGenerator();
            this.Id = this.keyGen.GenerateKey();

            if (this.Id == null || this.Id.Trim().Length == 0)
                throw new ArgumentNullException(nameof(this.Id));

            if (title == null || title.Trim().Length == 0)
                throw new EmptyTitleException();

            if (body == null || body.Trim().Length == 0)
                throw new EmptyBodyException();

            if (publishDate == DateTime.MinValue)
                throw new InvalidTimeZoneException();

            if (publisher == null || publisher.Trim().Length == 0)
                throw new EmptyPublisherException();

                        
            this.Title = title;
            this.Body = body;
            this.PublishDate = publishDate;
            this.Publisher = publisher;
        }


        private Article(
            string id,
            string title,
            string body,
            DateTime publishDate,
            string publisher)

        {
            if (id == null || id.Trim().Length == 0)
                throw new ArgumentNullException(nameof(id));

            if (title == null || title.Trim().Length == 0)
                throw new EmptyTitleException();

            if (body == null || body.Trim().Length == 0)
                throw new EmptyBodyException();

            if (publishDate == DateTime.MinValue)
                throw new InvalidTimeZoneException();

            if (publisher== null || publisher.Trim().Length == 0)
                throw new EmptyPublisherException();


            this.Id = id;
            this.Title = title;
            this.Body = body;
            this.PublishDate = publishDate;
            this.Publisher = publisher;
        }

        public static Article CreateNewArticle(string Id, string Title, string Body, DateTime PublishDate, string Publisher) => new Article(Id, Title, Body, PublishDate, Publisher);

        public static Article CreateNewArticle(string Title , string Body, DateTime PublishDate , string Publisher) => new Article(Title, Body, PublishDate, Publisher);

        public Article CreateArticleObject(string Title, string Body, DateTime PublishDate, string Publisher) =>  Article.CreateNewArticle(Title, Body, PublishDate, Publisher);

        public Article CreateArticleObject(string Id, string Title, string Body, DateTime PublishDate, string Publisher) => Article.CreateNewArticle(Id, Title, Body, PublishDate, Publisher);
        
    }
}
