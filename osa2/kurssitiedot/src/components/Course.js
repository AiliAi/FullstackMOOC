const Header = ({ name }) => {
    return <h1>{name}</h1>
};

const Content = ({ parts }) => {
    const partsEmelents = parts.map(part => {
        return <Part name={part.name} exercises={part.exercises} key={part.id} />;
    });

    return (
        <div>
            {partsEmelents}
        </div>
    )
};

const Part = ({ name, exercises }) => {
    return <p> {name} {exercises} </p>;
};

const Total = ({ parts }) => {
    const total = parts.reduce((a, b) => {
        return { exercises: a.exercises + b.exercises };
    });

    return <p><b>Total of {total.exercises} exercises</b></p>
};

const Course = ({ course }) => {
    return (
        <li>
            <Header
                name={course.name}
            />
            <Content
                parts={course.parts}
            />
            <Total
                parts={course.parts}
            />
        </li>
    )
};

export default Course;