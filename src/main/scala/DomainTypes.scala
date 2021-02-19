package mo.example

//TODO: change the types for these params to something more restrictive
case class Person private (id:Int, name: String, email: String, imageUrl: String)

//TODO: change imageUrl param to something more restrictive
final case class Hobby private (name: String, imageUrl: String)

final case class PersonNotFound(id: Int) extends Exception
