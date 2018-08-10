// import * as React from 'react';
// import { Link } from 'react-router-dom';
// import onClickOutside from 'react-onclickoutside';

// interface IProps {
//     title: string;
// }

// interface IState {
//     showDropdown: boolean;
// }

// class Dropdown extends React.Component<IProps, IState> {

//     constructor(props: IProps) {
//         super(props);

//         this.state = {
//             showDropdown: true
//         }
//     }

//     public render() {
//         const { title } = this.props;
//         const { showDropdown } = this.state;

//         const dropdown = showDropdown
//             ? <div className="dropdown">
//                 <ul>
//                     <li>
//                         <Link to={'/users'}>Users</Link>
//                     </li>
//                     <li>
//                         <Link to={'/recipes'}>Recipes</Link>
//                     </li>
//                     <li className="separator" />
//                     <li>
//                         <a href="https://dashboard.heroku.com/login">heroku</a>
//                     </li>
//                     <li>
//                         <a href="https://github.com/catos/mdk">Github</a>
//                     </li>
//                     <li>
//                         <a href="https://mlab.com/">mLab</a>
//                     </li>
//                     <li>
//                         <a href="http://getbootstrap.com/docs/4.1/getting-started/introduction/">Bootstrap</a>
//                     </li>
//                     <li>
//                         <a href="https://jwt.io/">Jwt.io</a>
//                     </li>
//                     <li>
//                         <a href="https://www.typescriptlang.org/docs/handbook/jsx.html">.tsx</a>
//                     </li>
//                     <li>
//                         <a href="https://reactjs.org/docs/hello-world.html">React</a>
//                     </li>
//                     <li>
//                         <a href="https://socket.io/docs/">socket.io</a>
//                     </li>
//                     <li>
//                         <a href="https://github.com/Lemoncode/react-typescript-samples/tree/master/04%20DisplayData">Lemoncode</a>
//                     </li>
//                     <li>
//                         <a href="https://github.com/goldfire/howler.js">Howler.js</a>
//                     </li>
//                     <li>
//                         <a href="http://react-dnd.github.io/react-dnd/">React DnD</a>
//                     </li>
//                 </ul>
//             </div>
//             : '';

//         return (
//             <div className="dropdown-wrapper">
//                 <span className="user-info dropdown-trigger"
//                     onClick={this.toggleDropdown}>
//                     {title}
//                 </span>
//                 {dropdown}
//             </div>
//         );
//     }

//     private toggleDropdown = () => {
//         this.setState({
//             showDropdown: !this.state.showDropdown
//         });
//     }

//     handleClickOutside = () => {
//         console.log('handleClickOutside');
//     }

//     disableOnClickOutside = (): void => {};
//     enableOnClickOutside = (): void => {};

// }

// export default onClickOutside(Dropdown);