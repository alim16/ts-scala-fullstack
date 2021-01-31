package mo.example.http

import zio._
import zio.interop.catz._

import org.http4s._
import org.http4s.dsl.Http4sDsl
import org.http4s.implicits._
import mo.example.database.Database

//following imports are for json encode/decode
import io.circe.generic.auto._
import org.http4s.circe.CirceEntityCodec._


object Routes {
    val dsl = Http4sDsl[Task]
    import dsl._

    def helloWorldsService(DAO:Database.Service) = HttpRoutes
        .of[Task] {
            case GET -> Root / "hello" => Ok("Hello there")
            case GET -> Root / "people" => DAO.getPeople().foldM(_ => NotFound(), Ok(_))
            case GET -> Root / "hobbies" => DAO.getHobbies().foldM(_ => NotFound(), Ok(_))
            case GET -> Root / "something" => Ok("something else")
        }.orNotFound
}