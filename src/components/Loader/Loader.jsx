import { MutatingDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <MutatingDots
      visible={true}
      height="100"
      width="100"
      color="#007bff"
      secondaryColor="#007bff"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
      wrapperClass=""
    />
  );
}
