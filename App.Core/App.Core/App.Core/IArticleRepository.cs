using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{
    public interface IArticleRepository
    {
        void AddArticle(Article Article);
        bool RemoveArticle(string Id);
        IEnumerable<Article> GetAll();

        IList<Article> GetArticleByPublisher(string Publisher);

        bool UpdateArticle(string Id, string Title, string Body, DateTime PublishDate, string Publisher);
    }

}
