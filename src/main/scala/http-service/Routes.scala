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
import io.circe.Json

object Routes {
  val dsl = Http4sDsl[Task]
  import dsl._

  case class FakeAuth(user:String,token:String)
  
  def combinedRoutesService(DAO: Database.Service) =
    HttpRoutes
      .of[Task] {
        case GET -> Root / "hello" => Ok("Hello there")
        case GET -> Root / "people" =>
           DAO.getPeople().foldM(_ => NotFound(), Ok(_))
        // case GET -> Root / "hobbies" =>
        //   DAO.getHobbies().foldM(_ => NotFound(), Ok(_)) //TODO: re-enable
        case GET -> Root / "something" => Ok("something else")
        case POST -> Root / "login" => Task.succeed(FakeAuth("someone@gmail.com","12356")).flatMap(Ok(_))
      }
      .orNotFound
}

//example to use for auth
// https://github.com/TimPigden/zio-http4s-examples/blob/master/http4s1/src/main/scala/zhx/auth/Authenticator.scala
//https://github.com/http4s/http4s/blob/main/examples/src/main/scala/com/example/http4s/ExampleService.scala