import * as React from "react";
import {
  TransitionGroup,
  CSSTransition as ReactTransition,
} from "react-transition-group";

const timeout = 1000;

interface TransitionProps {
  location?: Location;
}

export const Transition: React.FC<TransitionProps> = (props) => {
  const { children, location } = props;
  const transitionKey = location === undefined ? 'server-rendering' : location.pathname;
  return (
    <TransitionGroup>
      <ReactTransition
        key={transitionKey}
        timeout={{
          enter: timeout,
          exit: timeout,
        }}
        classNames="project"
      >
        {(status) => (
          <div

            style={{
              display: 'flex',
              width: '100%'
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};
