export default function Task({ task: { id, title, state } }) {
  return (
    <div className={`list-item ${state}`}>
      <label htmlFor="checked" className="checkbox">
        <input type="checkbox" name="checked" id={`archiveTask-${id}`} />
        <span className="checkbox-custom"></span>
      </label>
      <label htmlFor="title" className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          placeholder="Input title"
        />
      </label>

      {state !== "TASK_ARCHIVED" && (
        <button className="pin-button" id={`pinTask-${id}`}>
          <span className="icon-star"></span>
        </button>
      )}
    </div>
  );
}
