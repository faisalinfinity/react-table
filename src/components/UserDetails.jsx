

const UserDetails = ({ id, firstName, age, email, role }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{age}</td>
      <td>{email}</td>
      <td>{role}</td>
    </tr>
  );
};

export default UserDetails;
