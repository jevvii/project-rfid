from django.test import SimpleTestCase
from django.urls import reverse


class DashboardPageTests(SimpleTestCase):
    def test_url_exists_at_correct_location(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

    def test_url_available_by_name(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)


class AttendancePageTests(SimpleTestCase):
    def test_url_exists_at_correct_location(self):
        response = self.client.get("/attendance/")
        self.assertEqual(response.status_code, 200)

    def test_url_available_by_name(self):
        response = self.client.get(reverse("attendance"))
        self.assertEqual(response.status_code, 200)


class StudentsPageTests(SimpleTestCase):
    def test_url_exists_at_correct_location(self):
        response = self.client.get("/students/")
        self.assertEqual(response.status_code, 200)

    def test_url_available_by_name(self):
        response = self.client.get(reverse("students"))
        self.assertEqual(response.status_code, 200)


class ReportsPageTests(SimpleTestCase):
    def test_url_exists_at_correct_location(self):
        response = self.client.get("/reports/")
        self.assertEqual(response.status_code, 200)

    def test_url_available_by_name(self):
        response = self.client.get(reverse("reports"))
        self.assertEqual(response.status_code, 200)


class SettingsPageTests(SimpleTestCase):
    def test_url_exists_at_correct_location(self):
        response = self.client.get("/settings/")
        self.assertEqual(response.status_code, 200)

    def test_url_available_by_name(self):
        response = self.client.get(reverse("settings"))
        self.assertEqual(response.status_code, 200)
