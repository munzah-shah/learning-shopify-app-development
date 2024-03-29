import { Link } from "@remix-run/react";
import { Page, Layout, Text, VerticalStack, Card } from "@shopify/polaris";

// add a basic UI for the app's home screen
export default function Index() {
  return (
    <Page>
      <ui-title-bar title="Payment Customiser App"></ui-title-bar>
      <VerticalStack gap="5">
        <Layout>
          <Layout.Section>
            <Card>
              <VerticalStack gap="2">
                <VerticalStack gap="2">
                  <Text variant="bodyMd" as="p">
                    Please redirect to <b>Settings</b> &#62; <b>Payments</b>
                    &#62; <b>Payment Method Customizations</b> to create a new
                    customization. Alternatively,&nbsp;
                    <Link
                      to="https://admin.shopify.com/store/teamo-test/settings/payments/customizations"
                      target="_blank"
                    >
                      click here
                    </Link>
                    &nbsp; to add a new customization
                  </Text>
                </VerticalStack>
              </VerticalStack>
            </Card>
          </Layout.Section>
        </Layout>
      </VerticalStack>
    </Page>
  );
}
