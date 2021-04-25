import * as React from "react";
import cx from "classnames";
import { useForm } from "react-hook-form";
import { sendEmail } from "../../api";
import * as O from "fp-ts/lib/Option";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import "./contact-form.scss";
import { noop } from "lodash";

type Props = {
  onSuccess?: () => void;
};

type Inputs = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const ContactForm: React.FC<Props> = ({ onSuccess = noop }) => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [loading, setLoading] = React.useState(false);
  const [submitState, setSubmitState] = React.useState<
    O.Option<E.Either<"fail", "success">>
  >(O.none);

  const onSubmit = ({ name, email, company, message }: Inputs) => {
    setLoading(true);

    sendEmail({ name, email, company, message })
      .then(() => {
        setLoading(false);
        setSubmitState(O.some(E.right("success")));
        onSuccess();
      })
      .catch(() => {
        setLoading(false);
        setSubmitState(O.some(E.left("fail")));
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="label">Name</div>
      <input name="name" placeholder="write your name" ref={register} />
      <div className="label">Email</div>
      <input
        placeholder="write your email"
        className={cx({ error: !!errors.email })}
        name="email"
        ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
      />
      {errors.email && errors.email.type === "required" && (
        <div className="error">
          We can't contact you back if you don't give us your e-mail!
        </div>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <div className="error">
          This doesn't look like a well formatted email...
        </div>
      )}
      <div className="label">Company</div>
      <input placeholder="write your company" name="company" ref={register} />
      <div className="label">Message</div>
      <textarea
        placeholder="write your message"
        className={cx({ error: !!errors.message })}
        name="message"
        ref={register({ required: true })}
        cols={30}
      />
      {errors.message && (
        <div className="error">
          Without a message this communication won't be very useful...
        </div>
      )}

      <input
        className={cx({ loading })}
        type="submit"
        value={loading ? "Loading..." : "Submit"}
      />

      {pipe(
        submitState,
        O.fold(
          () => null,
          E.fold(
            () => (
              <div className="error">
                Looks like there was a problem sending the message.. Please try
                again.
              </div>
            ),
            () => (
              <div className="success">
                Message sent correctly! you will be contacted back within 24
                hours.
              </div>
            )
          )
        )
      )}
    </form>
  );
};

export default ContactForm;
