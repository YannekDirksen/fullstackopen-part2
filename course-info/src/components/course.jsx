const Header = (props) => <h2>{props.course}</h2>


const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => (
  <p>total of {props.total} exercises</p>
)

const Content = ({ parts }) => {
    return (
    <div>
    {parts.map(part => <Part key={part.id} part={part} /> )}

    </div>
)
}

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <Header course={course.name} />

      <Content parts={course.parts} />

      <Total total={totalExercises} />
    </div>
  )
}
export default Course;
