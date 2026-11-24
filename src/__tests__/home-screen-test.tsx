import { render } from "@testing-library/react-native";

import HomeScreen from "@/app";
import { QueryClientProvider } from "@/infra/react-query/client";

const MakeSut = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};

describe("<HomeScreen />", () => {
  test("Text renders correctly on HomeScreen", async () => {
    const { getByText } = await render(
      <MakeSut>
        <HomeScreen />
      </MakeSut>,
    );

    getByText(/Progresso geral/i);
  });
});
