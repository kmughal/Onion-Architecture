using System.Collections.Generic;
using System.Linq;

namespace App.Infrastructure
{
    using Core;
    using System;
    
    public class InMemoryArticleRepository  : IArticleRepository
    {
        static List<Article> articles = new List<Article>();
        static object locker = new object();
        public void ClearArticles() {
            lock (locker) {
                articles.Clear();
            }            
        }
       public  void AddArticle(Article Article) {
            lock (locker)
            {
                articles.Add(Article);
            }

        }

        public bool RemoveArticle(string Id) {

            if (Id == null || Id.Trim().Length == 0)
            {
                throw new ArgumentNullException();
            }

            Article search = articles.Where(a => a.Id.Equals(Id)).FirstOrDefault();
            if (search != null) {
                return articles.Remove(search);
            }
            return false;
        }

        public IEnumerable<Article> GetAll() {
            return articles;
        }

        public IList<Article> GetArticleByPublisher(string Publisher) {

            if (Publisher == null || Publisher.Trim().Length == 0) {
                throw new ArgumentNullException();
            }

            return articles.Where(a => a.Publisher.Equals(Publisher, System.StringComparison.InvariantCultureIgnoreCase)).ToList(); 
        }      

        public bool UpdateArticle(string Id, string Title, string Body, DateTime PublishDate,string Publisher) {
            if (Id == null || Id.Trim().Length == 0)
            {
                throw new ArgumentNullException();
            }
           
            this.RemoveArticle(Id);
            Article newArticle = Article.CreateNewArticle(Id,Title, Body, PublishDate, Publisher);            
            this.AddArticle(newArticle);
            return true;
        }    
    }
}
