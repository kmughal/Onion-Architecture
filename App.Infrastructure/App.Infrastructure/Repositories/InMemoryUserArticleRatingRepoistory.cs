
using System;
using System.Collections.Generic;
using System.Linq;

namespace App.Infrastructure
{
    using App.Core;


    public class InMemoryUserArticleRatingRepoistory : IUserArticleRatingRepository
    {
        static List<UserArticleRating> userArticlesRatings = new List<UserArticleRating>();
        IArticleRepository articleRepo;

        public InMemoryUserArticleRatingRepoistory(IArticleRepository ArticleRepository)
        {
            this.articleRepo = ArticleRepository;
        }

        public bool SaveRating(string ArticleId, string UserName, int Rating)
        {
            if (ArticleId == null || ArticleId.Trim().Length == 0)
                throw new ArgumentNullException(nameof(ArticleId));

            if (UserName == null || UserName.Trim().Length == 0 )
                throw new ArgumentNullException(nameof(UserName));

            if (Rating < default(int)) {
                throw new InvalidRatingException();
            }

            UserArticleRating search = userArticlesRatings.Where(r => r.Id.Equals(ArticleId, StringComparison.InvariantCultureIgnoreCase) && r.UserName.Equals(UserName, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
            if (search != null)
            {
                userArticlesRatings.Remove(search);
            }

            userArticlesRatings.Add(UserArticleRating.CreateUserRating(ArticleId, UserName.Trim().ToLower(), Rating));
            return true;
        }


        public IList<UserArticleRatingDto> GetUserArticlesWithRating(string UserName)
        {

            if (UserName == null || UserName.Trim().Length == 0) {
                throw new ArgumentNullException(nameof(UserName));
            }

            UserName = UserName.Trim().ToLower();

            var ds = from article in this.articleRepo.GetAll().ToList()
                     join userRating in userArticlesRatings on new { article.Id, UserName } equals new { userRating.Id, userRating.UserName } into grp
                     from g in grp.DefaultIfEmpty()
                     select new UserArticleRatingDto
                     {
                         Id = article.Id,
                         Title = article.Title,
                         Body = article.Body,
                         PublishDate = article.PublishDate,
                         Publisher = article.Publisher,
                         Rating = (g == null ? 0 : g.Rating)
                     };


            return ds.ToList();
        }
    }
}
