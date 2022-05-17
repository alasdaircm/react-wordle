import Row from "./Row";

const Grid = ({ currentGuess, guesses, turn }) => {
  return ( 
    <div>
      { guesses.map((g, index) => {
        if (index === turn) {
          return <Row currentGuess={currentGuess} key={index} />
        }
        return <Row guess={g} key={index}/>
      })}
    </div>
   );
}
 
export default Grid;