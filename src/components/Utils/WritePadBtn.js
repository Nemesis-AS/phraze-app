export default function WritePadBtn({ icon, mode, id, onClickEvent }) {
    return (
        <button className={`btn btn-sm fas fa-${icon} type1-button my-2 my-sm-0 mx-2 text-${mode === "light" ? "black" : "white"}`} id={id} onClick={onClickEvent}></button>
    )
}
