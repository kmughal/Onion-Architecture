using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace App.Tests
{
    using Moq;
    using Core;
    using Infrastructure;

    [TestClass]
    public class InMemoryArticleRateRepositoryTests {
        IUserArticleRatingRepository GetUserRatingRepo(params Article [] newArticles) {
            var articleRepo = new InMemoryArticleRepository();
            articleRepo.ClearArticles();
            foreach(Article article in newArticles)
                articleRepo.AddArticle(article);
            var articleRatingRepo = new InMemoryUserArticleRatingRepoistory(articleRepo);
            return articleRatingRepo;
        }

        [TestMethod]
        public void WhenUserRateTheArticleThenRatingMustBeSaved() {

            Article newArticle1 = Article.CreateNewArticle("Title", "Body", DateTime.Now, "Khurram");
            Article newArticle2 = Article.CreateNewArticle("Title 1 ", "Body 2" , DateTime.Now, "Mohib");
            var repo = GetUserRatingRepo(newArticle1, newArticle2);

            var target = repo.GetUserArticlesWithRating("User1");
            Assert.AreEqual(2, target.Count);
            Assert.AreEqual(0, target[0].Rating);
            Assert.AreEqual(0, target[1].Rating);

            repo.SaveRating(newArticle1.Id, "User1", 3);
            repo.SaveRating(newArticle2.Id, "User1", 2);

            target = repo.GetUserArticlesWithRating("User1");
            Assert.AreEqual(3, target[0].Rating);
            Assert.AreEqual(2, target[1].Rating);

        }

        [TestMethod]
        public void EachUserGetsOwnCopyOfArticleWhenChangeRatingThenRatingIsSavedAsPerUser()
        {
            Article newArticle = Article.CreateNewArticle("Title", "Body", DateTime.Now, "Khurram");

            var repo = GetUserRatingRepo(newArticle);

            var target = repo.GetUserArticlesWithRating("User1");
            Assert.AreEqual(0, target[0].Rating);

            repo.SaveRating(newArticle.Id, "User1", 3);
            target = repo.GetUserArticlesWithRating("User1");
            Assert.AreEqual(3, target[0].Rating);


             target = repo.GetUserArticlesWithRating("User2");
            Assert.AreEqual(0, target[0].Rating);

            repo.SaveRating(newArticle.Id, "User2", 5);
            target = repo.GetUserArticlesWithRating("User2");
            Assert.AreEqual(5, target[0].Rating);

        }

        // This might change in future as may be user will be allowed to do so.
        [ExpectedException(typeof(InvalidRatingException))]
        [TestMethod]
        public void WhenUserProvideNegativeRatingThenItShouldThrowAnException() {
            Article newArticle = Article.CreateNewArticle("Title", "Body", DateTime.Now, "Khurram");
            var repo = GetUserRatingRepo(newArticle);
            repo.SaveRating(newArticle.Id,"User1",-1);
        }
    }
}
