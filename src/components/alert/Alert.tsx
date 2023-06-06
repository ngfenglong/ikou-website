import {
  XCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/20/solid';

export enum ALERT_TYPE {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  INFORMATION = 'INFORMATION',
}

export const ALERT_TYPE_MAPPING = {
  [ALERT_TYPE.SUCCESS]: {
    type: ALERT_TYPE.SUCCESS,
    backgroundStyling: 'bg-green-50',
    headerTextStyling: 'text-green-800',
    descriptionTextStyling: 'text-green-700',
    icon: (
      <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
    ),
  },
  [ALERT_TYPE.WARNING]: {
    type: ALERT_TYPE.WARNING,
    backgroundStyling: 'bg-yellow-50',
    headerTextStyling: 'text-yellow-800',
    descriptionTextStyling: 'text-yellow-700',
    icon: (
      <ExclamationTriangleIcon
        className="h-5 w-5 text-yellow-400"
        aria-hidden="true"
      />
    ),
  },
  [ALERT_TYPE.ERROR]: {
    type: ALERT_TYPE.ERROR,
    backgroundStyling: 'bg-red-50',
    headerTextStyling: 'text-red-800',
    descriptionTextStyling: 'text-red-700',
    icon: <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />,
  },
  [ALERT_TYPE.INFORMATION]: {
    type: ALERT_TYPE.INFORMATION,
    backgroundStyling: 'bg-blue-50',
    headerTextStyling: 'text-blue-800',
    descriptionTextStyling: 'text-blue-700',
    icon: (
      <InformationCircleIcon
        className="h-5 w-5 text-blue-400"
        aria-hidden="true"
      />
    ),
  },
};

const Alert = ({ alertType, alertHeader, alertDescription }: PropsType) => {
  const { backgroundStyling, headerTextStyling, descriptionTextStyling } =
    ALERT_TYPE_MAPPING[alertType];

  return (
    <div className={`rounded-md p-2 ${backgroundStyling}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {alertType === ALERT_TYPE_MAPPING.SUCCESS.type && ALERT_TYPE_MAPPING.SUCCESS.icon}
          {alertType === ALERT_TYPE_MAPPING.INFORMATION.type &&
            ALERT_TYPE_MAPPING.INFORMATION.icon}
          {alertType === ALERT_TYPE_MAPPING.WARNING.type && ALERT_TYPE_MAPPING.WARNING.icon}
          {alertType === ALERT_TYPE_MAPPING.ERROR.type && ALERT_TYPE_MAPPING.ERROR.icon}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${headerTextStyling}`}>
            {alertHeader}
          </h3>
          <div className={`mt-2 text-sm ${descriptionTextStyling}`}>
            <p>{alertDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

type PropsType = {
  alertType: ALERT_TYPE;
  alertHeader: string;
  alertDescription: string;
};

export default Alert;
