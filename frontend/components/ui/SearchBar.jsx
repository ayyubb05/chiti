import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Icons() {
  return (
    <div className="flex gap-4 text-3xl text-blue-500">
      <FontAwesomeIcon icon={faHome} />
      <FontAwesomeIcon icon={faUser} />
      <FontAwesomeIcon icon={faSearch} />
      <FontAwesomeIcon icon={faUsers} />
    </div>
  );
}
