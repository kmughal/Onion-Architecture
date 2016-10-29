using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{
    public class UserArticleRating
    {
        public string Id { private set; get; }
        public string UserName { private set; get; }
        public int Rating { private set; get; }

        private UserArticleRating(string Id, string UserName, int Rating)
        {
            if (Id == null || Id.Trim().Length == 0)
                throw new ArgumentNullException(nameof(Id));

            if (UserName == null || UserName.Trim().Length == 0 )
                throw new ArgumentNullException(nameof(UserName));

            if (Rating < default(int))
                throw new InvalidRatingException();

            // test

            this.Id = Id;
            this.UserName = UserName;
            this.Rating = Rating;
        }

        public static UserArticleRating CreateUserRating(string ArticleId, string UserName, int Rating) => new UserArticleRating(ArticleId, UserName, Rating);

    }
}
