import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { BackendService } from "../../BackendService/BackendService.ts";

const WaitingPage = () => {
  const navigate = useNavigate();

  const tryAgain = async () => {
    const res = await BackendService.TryLock();
    if (res) {
      navigate("/");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Автомат занят другим пользователем</h1>
      <p>Подождите, пока он освободится, или попробуйте снова:</p>
      <Button type={"primary"} onClick={tryAgain}>
        Попробовать снова
      </Button>
    </div>
  );
};

export default WaitingPage;
