package mo.example

import zio.ZLayer
import mo.example.database.Database
import zio.Task
import mo.example.{Person, Hobby}
import zio.console.Console

object MockDB {
  val fakeDb: ZLayer[Console, Throwable, Database] = ZLayer.fromService {
    console =>
      new Database.Service {
        override def getPeople(): Task[List[Person]] =
          console.putStrLn("getting people list") *>
            Task {
              List(
                Person("name1", "name1@gmail.com", "/img1"),
                Person("name2", "name2@gmail.com", "/img2"),
                Person("name3", "name3@gmail.com", "/img3")
              )
            }

        override def getHobbies(): Task[List[Hobby]] =
          console.putStrLn("getting hobbies list") *>
            Task {
              List(
                Hobby("hobby1", "/img1"),
                Hobby("hobby2", "/img2"),
                Hobby("hobby3", "/img3")
              )
            }
      }
  }
}
