import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteDialog({ onDelete }: { onDelete: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white duration-300">ลบเป้าหมาย</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>ยืนยันการลบเป้าหมาย</AlertDialogTitle>
          <AlertDialogDescription>
            คุณแน่ใจหรือไม่ว่าต้องการลบเป้าหมายการออมนี้? การกระทำนี้ไม่สามารถย้อนกลับได้
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel asChild>
            <Button className="border bg-white hover:bg-gray-200 duration-300">ยกเลิก</Button>
          </AlertDialogCancel>
          <Button className="border bg-red-600 text-white hover:bg-red-700 duration-300" onClick={onDelete}>
            ยืนยัน
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
