const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const renderParts = () => {
    return parts.map(part => <Part key={part.id} part={part} />)
  }

  const total = parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <>
      {renderParts()}
      <Total sum={total} />
    </>
  )
}

export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
    )
}

export default Course
