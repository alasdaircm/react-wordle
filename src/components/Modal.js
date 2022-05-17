const Modal = ({ isCorrect, turn, solution}) => {
  return ( 
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You win!</h1>
          <p className="solution">{solution}</p>
          <p>you found the solution in {turn} guesses</p> 
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Pants</h1>
          <p className="solution">{solution}</p>
          <p>you didn't find the solution in {turn} guesses</p> 
        </div>
      )}
    </div>
   );
}
 
export default Modal;