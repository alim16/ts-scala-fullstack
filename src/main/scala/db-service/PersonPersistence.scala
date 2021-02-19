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
    Task.succeed(())

  def create(user: Person): Task[Person] =
    SQL
      .create(user)
      .run
      .transact(tnx)
      .foldM(err => Task.fail(err), _ => Task.succeed(user))

  def getPeople(): Task[List[Person]] =
    SQL
      .getPeople()
      .option
      .transact(tnx)
      .foldM(
        err =>  Task.fail(err), //Task.succeed(List( Person("name1", "name1@gmail.com", "/img1"))),
        maybePerson => Task.succeed(List(maybePerson.get)) //TODO: change to return something
      )
}

object PersonPersistenceService {
  object SQL {
    def createUsersTable: doobie.Update0 =
      sql"""
        CREATE TABLE USERS (
          id   Int,
          name VARCHAR NOT NULL,
          email VARCHAR NOT NULL,
          imageUrl VARCHAR NOT NULL
        )
        """.update

    def getPeople(): Query0[Person] =
      sql"""SELECT * FROM USERS""".query[Person] //TODO: fix so it can return a list/stream

    def create(user: Person): Update0 =
      sql"""
        INSERT INTO USERS (
          id, name) VALUES (${user.id},${user.name},${user.email},${user.imageUrl}
        )
        """.update
  }

  // def createUserTable: ZIO[Nothing, Throwable, Unit] =
  //   for {
  //     tnx <- ZIO.service[Transactor[Task]]
  //     _ <- SQL.createUsersTable.run
  //       .transact(tnx)
  //   } yield ()
}
