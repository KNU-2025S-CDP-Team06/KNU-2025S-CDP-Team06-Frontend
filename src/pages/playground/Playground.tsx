import BarGraph from "@components/graph/BarGraph";

const Playground = () => {
  return (
    <>
      <BarGraph
        data={[
          { data: 14, title: "14만원", paragraph: "03-23" },
          { data: 26, title: "26만원", paragraph: "03-24" },
          { data: 61, title: "61만원", paragraph: "03-25" },
          { data: 67, title: "67만원", paragraph: "03-26" },
          { data: 74, title: "74만원", paragraph: "03-27", ispredict: true },
        ]}
      ></BarGraph>
    </>
  );
};
export default Playground;
