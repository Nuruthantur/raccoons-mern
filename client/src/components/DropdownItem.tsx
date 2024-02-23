  export default function DropdownItem:(props){
  return(
    <li className = 'dropdownItem'>
      {/* <img src={props.img}></img> */}
      <a> {props.text} </a>
    </li>
  );
}