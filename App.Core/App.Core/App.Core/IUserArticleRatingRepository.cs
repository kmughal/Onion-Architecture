using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{
    public interface IUserArticleRatingRepository
    {
        bool SaveRating(string ArticleId, string UserName, int Rating);
        IList<UserArticleRatingDto> GetUserArticlesWithRating(string UserName);
    }

    [DataContract]
    public struct UserArticleRatingDto
    {
        [DataMember]
        public string Id;
        [DataMember]
        public string Title;
        [DataMember]
        public string Body;
        [DataMember]
        public DateTime PublishDate;
        [DataMember]
        public string Publisher;
        [DataMember]
        public int Rating;
    }

}
