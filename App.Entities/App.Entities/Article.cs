using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Entities
{
    using Core;

    public class Article : IArticleFactory
    {
        public int Id { get; private set; }
        public string Body { get; private set; }
        public string Title { get; private set; }
        public DateTime PublishDate { get; set; }

        public string Publisher { get; set; }

        public int Likes { get; set; }

        private Article(string body,
            string title,
            DateTime publishDate,
            string publisher)
        {
            this.Body = body;
            this.Title = title;
            this.PublishDate = publishDate;
            this.Publisher = publisher;
        }

        public static Article CreateNewArticle(string body, string title, DateTime publishDate, string publisher)
        {

            return new Article(body, title, publishDate, publisher);
        }

        
    }
}
