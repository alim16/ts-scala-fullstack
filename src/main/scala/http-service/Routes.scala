package mo.example.http

import zio._
import zio.interop.catz._

import org.http4s._
import org.http4s.dsl.Http4sDsl
import org.http4s.implicits._
import mo.example.database.Database

///
//import io.circe.{Decoder, Encoder}
//import org.http4s.{EntityDecoder, EntityEncoder}
//import org.http4s.circe._


object Routes {
    val dsl = Http4sDsl[Task]
    import dsl._

    val runtime = Runtime.default //TODO: remove this, temporary and change people route

    def helloWorldsService(DAO:Database.Service) = HttpRoutes
        .of[Task] {
            case GET -> Root / "hello" => Ok("Hello there")
            case GET -> Root / "people" => Ok(s"${runtime.unsafeRun(DAO.getPeople())}")
                   // DAO.getPeople().foldM(_ => NotFound(), Ok(_))
            case GET -> Root / "something" => Ok("something else")
        }.orNotFound
}