import { useParams } from "react-router-dom";

const UpdateJobs = () => {
    const { _id } = useParams();
    console.log(_id);
    return (
        <div>
            {/* Your update job form or component can go here */}
        </div>
    );
};

export default UpdateJobs;
