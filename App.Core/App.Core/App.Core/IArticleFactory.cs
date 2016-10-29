using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{
    public interface IArticleFactory
    {
        Article CreateArticleObject(string Title, string Body, DateTime PublishDate, string Publisher);
        Article CreateArticleObject(string Id, string Title, string Body, DateTime PublishDate, string Publisher);
    }

   
}
