const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  inputRef,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:{' '}
        <input
          type="text"
          id="new-name"
          name="name"
          value={newName}
          onChange={handleNameChange}
          ref={inputRef}
        />
      </div>
      <div>
        number:{' '}
        <input
          type="text"
          id="new-phone"
          name="phone"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
