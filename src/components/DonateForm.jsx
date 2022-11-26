import { useState } from "react";
import "react-credit-cards-2/es/styles-compiled.css";
import Cards from "react-credit-cards-2";
import {
  Button,
  Modal,
  NumberInput,
  Paper,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";
import { IconCheck, IconCurrencyDollarSingapore, IconX } from "@tabler/icons";
import { useAuth } from "../AuthContext";
import { LoginForm } from "./Login";
import emailjs from "emailjs-com";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function DonateForm() {
  const [form, setForm] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
    amount: 0,
  });
  const [opened, setOpened] = useState(false);
  const [loginOpened, setLoginOpened] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  /*   const handleInputFocus = (e) => {
    setForm({ focus: e.target.name });
  };
 */
  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setForm({ ...form, [target.name]: target.value });
  };

  return (
    <>
      <Tooltip label="Login to Donate" disabled={currentUser}>
        <Button
          onClick={() => {
            return currentUser ? setOpened(true) : setLoginOpened(true);
          }}
          variant={currentUser ? "normal" : "light"}
        >
          Donate
        </Button>
      </Tooltip>
      <Modal
        title="Donate to support our efforts!"
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
      >
        <Text size="lg" weight={500}></Text>
        <NumberInput
          defaultValue={0.0}
          precision={2}
          min={0}
          step={0.01}
          max={1}
          icon={<IconCurrencyDollarSingapore />}
          name="amount"
          style={{ marginBottom: "10px", marginTop: "10px" }}
        />
        <div
          id="PaymentForm"
          style={{ display: "flex", flexDirection: "column", gap: "30" }}
        >
          <Cards
            cvc={form.cvc}
            expiry={form.expiry}
            focused={form.focus}
            name={form.name}
            number={form.number}
          />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              showNotification({
                id: "load-data",
                loading: true,
                title: "Processing payment",
                message: "Please wait...",
                autoClose: false,
                disallowClose: true,
              });
              const adoptCol = collection(db, "donations");
              try {
                await addDoc(adoptCol, {
                  name: form.name,
                  email: currentUser.email,
                  amount: form.amount,
                });
                await emailjs.send(
                  "service_79te5fr",
                  "template_q7vzo93",
                  { ...form },
                  "3_aLZ1Ewod1hxomsu"
                );
                setForm({
                  cvc: "",
                  expiry: "",
                  focus: "",
                  name: "",
                  number: "",
                  amount: 0,
                });
                setOpened(false);
                updateNotification({
                  id: "load-data",
                  color: "teal",
                  title: "Payment processed",
                  message:
                    "Thank you! You will be redirected home in 2 seconds.",
                  icon: <IconCheck size={16} />,
                  autoClose: 2000,
                  onClose: () => {
                    "bye";
                  },
                });
              } catch {
                showNotification({
                  id: "hello-there",
                  disallowClose: true,
                  onClose: () => console.log("unmounted"),
                  onOpen: () => console.log("mounted"),
                  autoClose: 5000,
                  title: "You've been compromised",
                  message: "Leave the building immediately",
                  color: "red",
                  icon: <IconX />,
                  className: "my-notification-class",
                  style: { backgroundColor: "red" },
                  sx: { backgroundColor: "red" },
                  loading: false,
                });
              }
              /* form.reset(); */
            }}
          >
            <div>
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                style={{ marginBottom: "10px", marginTop: "10px" }}
                onChange={handleInputChange}
                /* onFocus={handleInputFocus} */
              />
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                style={{ marginBottom: "10px", marginTop: "10px" }}
                onChange={handleInputChange}
                /* onFocus={handleInputFocus} */
              />
              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                style={{ marginBottom: "10px", marginTop: "10px" }}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                style={{ marginBottom: "10px", marginTop: "10px" }}
                onChange={handleInputChange}
                /* onFocus={this.handleInputFocus} */
              />
            </div>
            <Button color="green" type="submit" fullWidth>
              Donate
            </Button>
          </form>
        </div>
      </Modal>
      <LoginForm opened={loginOpened} setOpened={setLoginOpened} />
    </>
  );
}
