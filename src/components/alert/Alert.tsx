import { ALERT_TYPE, ALERT_TYPE_MAPPING } from "../../constants/theme-config";

const Alert = ({ alertType, alertHeader, alertDescription }: PropsType) => {
  const { backgroundStyling, headerTextStyling, descriptionTextStyling } =
    ALERT_TYPE_MAPPING[alertType as ALERT_TYPE];

  return (
    <div className={`rounded-md p-2 ${backgroundStyling}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {alertType === ALERT_TYPE_MAPPING.SUCCESS.type &&
            ALERT_TYPE_MAPPING.SUCCESS.icon}
          {alertType === ALERT_TYPE_MAPPING.INFORMATION.type &&
            ALERT_TYPE_MAPPING.INFORMATION.icon}
          {alertType === ALERT_TYPE_MAPPING.WARNING.type &&
            ALERT_TYPE_MAPPING.WARNING.icon}
          {alertType === ALERT_TYPE_MAPPING.ERROR.type &&
            ALERT_TYPE_MAPPING.ERROR.icon}
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
