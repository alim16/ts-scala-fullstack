package mo.example

import zio.ZLayer
import mo.example.database.Database
import zio.Task
import mo.example.{Person, Hobby}

object MockDB {
  val fakeDb: ZLayer[Any, Throwable, Database] = ZLayer.succeed {
    new Database.Service {
      override def getPeople(): Task[List[Person]] = Task {
        List(
          Person("name1", "name1@gmail.com", "/img1"),
          Person("name2", "name2@gmail.com", "/img2"),
          Person("name3", "name3@gmail.com", "/img3")
        )
      }
      override def getHobbies(): Task[List[Hobby]] = Task {
        List(
          Hobby("hobby1", "/img1"),
          Hobby("hobby2", "/img2"),
          Hobby("hobby3", "/img3")
        )
      }
    }
  }
}
