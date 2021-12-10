import classNames from 'classnames';
import { useId } from 'hooks';
import './index.css';

function Monogram({ highlight, className, ...props }) {
  const id = useId();
  const clipId = `monogram-clip-${id}`;

  return (
    <svg
      aria-hidden
      className={classNames('monogram', className)}
      width="40"
      height="40"
      viewBox="0 0 15 16"
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M1.94238 4.00293L8.33057 0.260254C9.93018 0.868652 11.6323 1.82227 13.437 3.12109C12.6577 3.64062 11.8579 4.19092 11.0376 4.77197C13.1841 6.43311 14.2573 7.96436 14.2573 9.36572C14.2573 9.89209 14.1104 10.3979 13.8164 10.8833C12.7158 12.6812 10.4565 14.3457 7.03857 15.877C5.06982 14.1338 2.81738 13.187 0.28125 13.0366L2.88574 11.1396L2.94727 6.10498C2.96094 5.271 2.62598 4.57031 1.94238 4.00293ZM9.39697 4.34131C8.43994 3.63037 7.38379 3.10742 6.22852 2.77246L6.20801 6.50488L9.39697 4.34131ZM9.37646 13.6211C10.4702 12.6641 11.0171 11.625 11.0171 10.5039C11.0171 9.7793 10.812 9.11279 10.4019 8.50439C9.9917 7.896 9.38672 7.46533 8.58691 7.2124C8.29297 7.12354 7.94434 7.0791 7.54102 7.0791C7.14453 7.0791 6.69678 7.21924 6.19775 7.49951L6.17725 10.2476L5.1416 10.8833C7.1377 11.8813 8.54932 12.7939 9.37646 13.6211Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className="monogram__highlight" width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
}

export default Monogram;
