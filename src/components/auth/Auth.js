import { useState } from "react";
import { supabase } from "./supabaseClient";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({
    visible: false,
    type: "secondary",
    message: "",
  });

  const getRedirect = () => {
    console.log("ENV", process.env.NODE_ENV);
    let output = { emailRedirectTo: null };
    if (process.env.NODE_ENV == "development") {
      output.emailRedirectTo = "http://localhost:3000/";
    } else {
      output.emailRedirectTo = "https://inductme.netlify.app/";
    }
    return output;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage({
        visible: true,
        type: "secondary",
        message: "",
      });

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: getRedirect(),
      });
      if (error) throw error;
      setMessage({
        visible: true,
        type: "success",
        message: "Check your email for the login link!",
      });
    } catch (error) {
      setMessage({
        visible: true,
        type: "danger",
        message: error.error_description || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Sign In</h2>
      {message.visible ? (
        <Alert variant={message.type}>
          {loading ? <Spinner className="ml-3" /> : <></>}
          {message.message}
        </Alert>
      ) : (
        <></>
      )}
      {loading ? (
        <></>
      ) : (
        <>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We will send you a magic link to log in with
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
}
