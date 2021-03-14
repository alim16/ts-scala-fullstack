package mo.example

import doobie.util.transactor.Transactor
import zio.Task

import zio.ZIO
import zio.interop.catz._

import doobie.implicits._
import doobie.{ Query0, Update0 }

final case class PersonPersistanceService(tnx: Transactor[Task]) {
  import PersonPersistenceService._

  def createUserTable: Task[Unit] = //TODO: added for testing, remove later
      SQL.createUsersTable.run
        .transact(tnx).foldM(err => Task.fail(err), _ => Task.succeed(()))


  def addFakeUser() = create(Person(1,"name11", "name11@gmail.com", "/some/url")) *> 
    Task.succeed(()) //TODO: added for testing, remove later

  def create(user: Person): Task[Person] =
    SQL
      .create(user)
      .run
      .transact(tnx)
      .foldM(err => Task.fail(err), _ => Task.succeed(user))

  def getPeople(): Task[List[Person]] =
    SQL
      .getPeople()
      .to[List]
      .transact(tnx)
      .foldM(
        err =>  Task.fail(err),
        peopleList =>  Task.succeed(peopleList.take(5)) 
      )
}

object PersonPersistenceService {
  object SQL {
    def createUsersTable: doobie.Update0 =
      sql"""
        CREATE TABLE IF NOT EXISTS users (
          id   Int,
          name VARCHAR NOT NULL,
          email VARCHAR NOT NULL,
          imageUrl VARCHAR NOT NULL
        )
        """.update

    def getPeople(): Query0[Person] =
      sql"""SELECT * FROM users""".query[Person]

    def create(user: Person): Update0 =
      sql"""
        INSERT INTO users (
          id, name, email, imageUrl) VALUES (${user.id},${user.name},${user.email},${user.imageUrl}
        )
        """.update
  }
}
