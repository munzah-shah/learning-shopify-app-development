import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import {
  Page,
  Layout,
  VerticalStack,
  Text,
  Divider,
  Card,
  Button,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(
    `#graphql
      query {
        paymentCustomizations(first: 50) {
          edges {
            node {
              title
            }
          }
        }
      }`
  );

  const responseJson = await response.json();
  const paymentCustomizations =
    responseJson.data.paymentCustomizations.edges.map(
      (edge) => edge.node.title
    );

  return json({
    paymentCustomizations,
  });
};

// add a basic UI for the app's home screen
export default function Index() {
  const loaderData = useLoaderData();
  const [paymentCustomizations, setPaymentCustomizations] = useState(
    loaderData.paymentCustomizations || []
  );

  useEffect(() => {
    if (loaderData.paymentCustomizations) {
      setPaymentCustomizations(loaderData.paymentCustomizations);
    }
  }, [loaderData.paymentCustomizations]);

  return (
    <Page title="Welcome to Payment Customization App">
      {/* page content */}
      <VerticalStack gap="5">
        <Layout>
          <Layout.Section>
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "2rem",
                }}
              >
                <b>
                  We help you create your own customized checkout experience 🛒
                </b>
                <Button
                  primary
                  url="https://admin.shopify.com/store/teamo-test/settings/payments/customizations"
                  target="_blank"
                >
                  Create New
                </Button>
              </div>
              <p style={{ marginBottom: "1rem" }}>
                You have created the following payment customizations:
              </p>
              {paymentCustomizations.map((payment, index) => (
                <>
                  <Divider borderColor="border" key={index} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      height: "60px",
                    }}
                  >
                    <Text as="h2" variant="headingSm">
                      {payment}
                    </Text>
                  </div>
                </>
              ))}
            </Card>
          </Layout.Section>
        </Layout>
      </VerticalStack>
    </Page>
  );
}
