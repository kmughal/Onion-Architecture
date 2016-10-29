using App.Core;
using App.Infrastructure;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Tests
{
    [TestClass]
    public class ArticleRepositoryTests
    {

        [TestMethod]
        public void WhenAddANewArticleThenItShouldBeSaved()
        {

            var articleRepo = new InMemoryArticleRepository();
            Article newArticle = Article.CreateNewArticle("Title", "Body", DateTime.Now, "Khurram");
            articleRepo.AddArticle(newArticle);

            var target = articleRepo.GetAll().ToList()[0];
            Assert.AreEqual(newArticle.Id, target.Id);
            Assert.AreEqual(newArticle.Title, target.Title);
            Assert.AreEqual(newArticle.PublishDate, target.PublishDate);
            Assert.AreEqual(newArticle.Publisher, target.Publisher);
        }

        [TestMethod]
        public void WhenArticleInformationIsAlteredThenItShouldBeUpdated()
        {
            var articleRepo = new InMemoryArticleRepository();
            articleRepo.ClearArticles();
            Article newArticle = Article.CreateNewArticle("Title", "Body", DateTime.Now, "Khurram");
            articleRepo.AddArticle(newArticle);

            articleRepo.UpdateArticle(newArticle.Id, "Title Changed", "Body Changed", newArticle.PublishDate, newArticle.Publisher);
            var target = articleRepo.GetAll().ToList()[0];
                        
            Assert.AreEqual("Title Changed", target.Title);
            Assert.AreEqual("Body Changed", target.Body);
            Assert.AreEqual(true, newArticle.PublishDate.Equals(target.PublishDate));
            Assert.AreEqual(newArticle.Publisher, target.Publisher);
        }

        [TestMethod]
        public void WhenAnArticleIsRemovedThenItShouldNotBePresent()
        {
            var articleRepo = new InMemoryArticleRepository();
            articleRepo.ClearArticles();
            Article newArticle = Article.CreateNewArticle("Title", "Body", DateTime.Now, "Khurram");
            articleRepo.AddArticle(newArticle);

            var target = articleRepo.GetAll().ToList();


            Assert.AreEqual(1, target.Count);
            articleRepo.RemoveArticle(newArticle.Id);

            var collection = articleRepo.GetAll().ToList();
            Assert.AreEqual(0, collection.Count);


        }

        [TestMethod]
        [ExpectedException(typeof(EmptyTitleException))]
        public void WhenTitleIsNotProvidedThenTitleCanNotBeNullExceptionIsThrown()
        {

            var articleRepo = new InMemoryArticleRepository();
            Article newArticle = Article.CreateNewArticle(string.Empty, "Body", DateTime.Now, "Adam");
            articleRepo.AddArticle(newArticle);

        }

        [TestMethod]
        [ExpectedException(typeof(EmptyBodyException))]
        public void WhenBodyIsNotProvidedThenExceptionIsThrown()
        {

            var articleRepo = new InMemoryArticleRepository();
            Article newArticle = Article.CreateNewArticle("Title", string.Empty, DateTime.Now, "Adam");
            articleRepo.AddArticle(newArticle);

        }


        [TestMethod]
        [ExpectedException(typeof(InvalidTimeZoneException))]
        public void WhenWrongPublishDateIsProvidedThenExceptionIsThrown()
        {

            var articleRepo = new InMemoryArticleRepository();
            Article newArticle = Article.CreateNewArticle("Title", "Body", DateTime.MinValue, "Adam");
            articleRepo.AddArticle(newArticle);
        }

        [TestMethod]
        [ExpectedException(typeof(EmptyPublisherException))]
        public void WhenPublisherIsNotProvidedThenExceptionIsThrown()
        {

            var articleRepo = new InMemoryArticleRepository();
            Article newArticle = Article.CreateNewArticle("Title", "Body", DateTime.Now, "");
            articleRepo.AddArticle(newArticle);

        }

    }
}